PROJECT_NAME="hurry-up"
VERSION="1.0.0"
IMAGE_NAME="${PROJECT_NAME}:${VERSION}"

cd app
docker build -t "${IMAGE_NAME}" .
