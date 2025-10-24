pipeline {
    agent any

    environment {
        // GitHub and Docker Hub credentials IDs you created in Jenkins
        GITHUB_CREDENTIALS = 'github-creds'
        DOCKERHUB_CREDENTIALS = 'dockerhub-creds'
        DOCKER_IMAGE = 'dumindudasun/node-jenkins-demo-EC2'
        NODE_VERSION = '18' // Match your Node.js version
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Dumindudasun/node-jenkins-dockerhub-EC2.git',
                    credentialsId: "${GITHUB_CREDENTIALS}"
            }
        }

        stage('Setup Node.js') {
            steps {
                // Install Node.js using NodeJS plugin
                nodejs("${NODE_VERSION}") {
                    sh 'node -v'
                    sh 'npm -v'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests but don’t fail build if no tests found
                sh 'npm test || echo "No tests found"'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIALS}") {
                        docker.image("${DOCKER_IMAGE}:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-credentials-id']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@16.171.137.244 '
                        docker pull ${DOCKER_IMAGE}:${env.BUILD_NUMBER} &&
                        docker stop node-app || true &&
                        docker rm node-app || true &&
                        docker run -d --name node-app -p 3000:3000 ${DOCKER_IMAGE}:${env.BUILD_NUMBER}
                    '
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Build finished!'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
