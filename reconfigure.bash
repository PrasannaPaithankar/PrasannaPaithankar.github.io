#!/bin/bash
mkdir -p pkg
cp -r Main/_site/* pkg/
cp -r AT60205/ pkg/

sshpass -p "rAfETI0o3A6j" sftp prasannabp@cse.iitkgp.ac.in <<EOF
cd public_html
put -r pkg/*
EOF