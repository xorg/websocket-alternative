#!/bin/bash
# clients.sh
# This script simulates a bunch of clients that are listening to server sent events
NUM_CLIENTS=1000

for ((n=0;n<$NUM_CLIENTS;n++))
do
 curl -H Accept:text/event-stream http://localhost:3001/events &>/dev/null &
done