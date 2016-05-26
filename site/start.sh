#!/bin/bash
# This command starts host process for databases 
# creates the database if it does not already exist
# and then starts the server
mongod -dbpath data & node appneg.js