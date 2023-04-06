pipeline {
   agent any
  
   environment {
       DOCKER_HUB_REPO = "marcpublic/nodejs"
       CONTAINER_NAME = "nodejs"
 
   }
  
   stages {
       stage('Checkout') {
           steps {
               checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/marcpublic/nodejs']]])
           }
       }
       stage('Build') {
           steps {
               echo 'Building..'
               sh 'docker image build -t $DOCKER_HUB_REPO:latest .'
           }
       }
       stage('Deploy') {
           steps {
               echo 'Deploying....'
               sh 'docker stop $CONTAINER_NAME || true'
               sh 'docker rm $CONTAINER_NAME || true'
               sh 'docker run -d -p 80:3000 --name $CONTAINER_NAME $DOCKER_HUB_REPO'
           }
       }
   }
}
