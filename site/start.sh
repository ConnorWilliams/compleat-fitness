#!/bin/bash
# This command 
# - creates directory for database if doesn't already exist
# - starts host process for databases 
# - starts the server
mkdir data & mongod -dbpath data & node server.js
