// @ts-ignore
import express from "express"
import { kysely } from "../database/database"
import { jsonArrayFrom } from "kysely/helpers/postgres"


const app = express()

app.get( "/", async ( req: any, res: any ) => {
  const parents = await kysely
    .selectFrom( "qualite-donnees.stop" )
    .where( "parent_station", "=", "" )
    .select( ["stop_id", "stop_lon as lon", "stop_lat as lat", "stop_name"] )
    .execute()

  // Récupérer tous les enfants
  const children = await kysely
    .selectFrom( "qualite-donnees.stop as s" )
    .innerJoin( "qualite-donnees.stop_times as st", "st.stop_id", "s.stop_id" )
    .innerJoin( "qualite-donnees.trips as t", "t.trip_id", "st.trip_id" )
    .innerJoin( "qualite-donnees.routes as r", "t.route_id", "r.route_id" )
    .where( "parent_station", "!=", "" )
    .select( [
      "s.stop_name as name",
      "s.location_type",
      "r.route_color as color",
      "s.wheelchair_boarding",
      "r.route_text_color",
      "r.route_type as type",
      "s.parent_station",
      "r.route_short_name",
      "r.route_long_name",
    ] )
    .groupBy( "s.stop_id" )
    .groupBy( "r.route_color" )
    .groupBy( "r.route_text_color" )
    .groupBy( "r.route_type" )
    .groupBy( "r.route_short_name" )
    .groupBy( "r.route_long_name" )
    .distinct()
    .execute()

  // Créer un dictionnaire pour associer chaque parent avec ses enfants
  const parentsWithChildren = parents.map( ( parent ) => ({
    ...parent,
    childs: children.filter( ( child ) => child.parent_station === parent.stop_id ),
  }) )

  res.send( parentsWithChildren )
} )

app.get( "/shapeV1", async ( req: any, res: any ) => {
  try {
    const result: any[] = []
    const trips = await kysely
      .with( "shapes", () => kysely
        .selectFrom( "qualite-donnees.shapes as s" )
        .select( [
          "s.shape_id",
          "s.shape_pt_lat as lat",
          "s.shape_pt_lon as lon",
          "s.shape_pt_sequence"
        ] )
        .orderBy( "s.shape_pt_sequence", "asc" )
        .distinct()
        .as( "shapes" ).expression
      )
      .selectFrom( "qualite-donnees.trips as t" )
      .innerJoin( "qualite-donnees.routes as r", "r.route_id", "t.route_id" )
      .select( eb => [
        "t.trip_id as id",
        "r.route_color as color",
        "t.shape_id",
        jsonArrayFrom( eb.selectFrom( "shapes as s" )
          .selectAll()
          .where( "s.shape_id", "=", eb.ref( "t.shape_id" ) )
          .orderBy( "s.shape_pt_sequence asc" )
        ).as( "shapes" ), // Transform JSON to text for comparison
      ] )
      .where( "t.direction_id", "=", 0 )
      .limit( 1 )
      .groupBy( ["t.shape_id", "t.trip_id", "r.route_id"] ) // Combine groupBy parameters
      .distinctOn( "r.route_short_name" )
      .execute()

    res.send( trips )
  } catch ( e ) {
    console.log( e )
    res.status( 500 ).send( { error: "Internal Server Error" } )
  }
} )

app.get( "/shape", async ( req: any, res: any ) => {
  try {
    const shapesData = await kysely
      .selectFrom( "qualite-donnees.shapes as s" )
      .select( [
        "s.shape_id",
        "s.shape_pt_lat as lat",
        "s.shape_pt_lon as lon",
        "s.shape_pt_sequence"
      ] )
      .orderBy( "s.shape_pt_sequence", "asc" )
      .execute()

    const groupedShapes = shapesData.reduce( ( acc, shape ) => {
      if ( !acc[shape.shape_id] ) acc[shape.shape_id] = []
      acc[shape.shape_id].push( {
        lat: shape.lat,
        lon: shape.lon,
        sequence: shape.shape_pt_sequence
      } )
      return acc
    }, {} )

    const trips = await kysely
      .selectFrom( "qualite-donnees.trips as t" )
      .innerJoin( "qualite-donnees.routes as r", "r.route_id", "t.route_id" )
      .select( [
        "t.trip_id as id",
        "r.route_color as color",
        "t.shape_id",
      ] )
      .where( "t.direction_id", "=", 0 )
      .groupBy( ["t.shape_id", "t.trip_id", "r.route_id"] )
      .distinctOn( "r.route_short_name" )
      .execute()

    // Associer les `shapes` aux `trips` obtenus
    const tripsWithShapes = trips.map( trip => ({
      ...trip,
      shapes: groupedShapes[trip.shape_id] || []
    }) )

    res.send( tripsWithShapes )
  } catch ( e ) {
    console.error( e )
    res.status( 500 ).send( { error: "Internal Server Error" } )
  }
} )

app.listen( 3000 )
