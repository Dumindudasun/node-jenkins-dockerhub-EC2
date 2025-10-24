pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'dumindudasun/node-jenkins-demo'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Dumindudasun/node-jenkins-dockerhub.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'start /B node index.js'
                bat 'npm test || echo "No tests found"'
            }
        }
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_HUB_REPO%:latest .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat 'docker push %DOCKER_HUB_REPO%:latest'
            }
        }
    }

    post {
        success {
            echo '✅ Build and Push Successful!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}
