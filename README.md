# Essensplaner Quickstart

### configure .env

modify .env.default and rename to .env

### building

```bash
docker build -t iowi/essensplaner:1.0 .
```

### running

you can modify the name, name of volume and the correct version of the image.

the ports and the storage path have to be the same as in the env-file.

then run the container

```bash
docker run -d --name essensplaner -v essensplaner_storage:/usr/essensplaner/storage/ -p 80:80 --env-file ./.env iowi/essensplaner:1.0
```
