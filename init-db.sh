#!/bin/sh

yarn migrate-undo
yarn migrate
node api/index.js
