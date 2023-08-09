# Essensplaner

## Quickstart

### building

```bash
docker build -t iowi/essensplaner:1.0 .
```

### running

you can modify the name, name of volume, exposed port and the correct version of the image.

then run the container

```bash
docker run -d --name essensplaner -v essensplaner_storage:/usr/essensplaner/storage/ -p 3000:3000 --restart unless-stopped iowi/essensplaner:1.0
```
