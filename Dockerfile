FROM docker.cernerrepos.net/ion/ion-node:5

# run the server
CMD ["npm", "run", "start-static"]
