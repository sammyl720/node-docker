### Learn Docker - DevOps with Node.js & Express

[Online Tutorial from freecodecamp](https://www.youtube.com/watch?v=9zUHg7xjIqQ)


### Docker commands

#####Build Image from Dockerfile

```bash
  docker build -t node-image .
```
1. The ``-t`` flag is to give the image a name and and optional tag ``name:tag``
1. The ``.`` is the location/context of the Dockerfile

*For more information on the docker build command run `docker build --help`*

---

##### Run a container from image
```bash
  docker run -d -v %cd%:/app:ro -v /app/node_modules --name node-app -e PORT=4000 -p 3000:4000 node-app-image
```

1. The `-d` flag runs the container in the background
1. The `-v` flag is to bind mount a volume
1. The ``--name`` flag gives the container a name
1. The `-e` flag is to set enviroment variables
1. The `-p` flag lets you publish the container's port to the host
1. At the end of the command is the name of the image for the container to run

---

#### Using docker-compose

docker-compose lets you spin up multiple image containers