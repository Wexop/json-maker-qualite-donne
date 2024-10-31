import express from "express"
import { kysely } from "../database/database"


const app = express()

app.get( "/", async ( req, res ) => {

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
    .select( ["s.stop_name as name", "s.location_type", "r.route_color as color", "s.wheelchair_boarding", "r.route_text_color", "r.route_type as type", "s.parent_station", "r.route_short_name", "r.route_long_name"] )
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

app.listen( 3000 )
