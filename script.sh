export $(grep -v '^#' .env | xargs -d '\n')

echo "building image: iowi/essensplaner:${ESSENSPLANER_VERSION} ..."

docker build -t iowi/essensplaner:"${ESSENSPLANER_VERSION}" --build-arg HOST="${ESSENSPLANER_HOST}" --build-arg PORT="${ESSENSPLANER_PORT}" --build-arg API_PATH="${ESSENSPLANER_API_PATH}" .

echo "starting container: iowi/essensplaner:${ESSENSPLANER_VERSION} ..."
docker run -d --name essensplaner -v essensplaner_storage:"${ESSENSPLANER_STORAGE_PATH}" -p "${ESSENSPLANER_PORT}":"${ESSENSPLANER_PORT}" --env-file .env iowi/essensplaner:"${ESSENSPLANER_VERSION}"

unset $(grep -v '^#' .env | sed -E 's/(.*)=.*/\1/' | xargs)

echo "Essensplaner is now up and running"
