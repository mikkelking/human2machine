#!/bin/bash
cp ../hdde/mkhuman/app-admin.json . && rm -rf app-admin && meteor-kitchen app-admin.json app-admin && cp -R ./app-admin.vscode app-admin/.vscode && cd app-admin && meteor npm install && DEBUG=app-admin:* MONGO_URL=mongodb://localhost/app-admin meteor 
