CONTAINER_NAME="hurry-up"
IMAGE_NAME="hurry-up:1.0.0"

docker stop "${CONTAINER_NAME}"
docker rm "${CONTAINER_NAME}"
docker run -dit --name "${CONTAINER_NAME}" -p 3000:3000 "${IMAGE_NAME}"
