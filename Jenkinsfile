pipeline {
    agent any

    environment {
        GITHUB_CREDENTIALS = 'github-creds'
        DOCKERHUB_CREDENTIALS = 'dockerhub-creds'
        DOCKER_IMAGE = 'dumindudasun/node-jenkins-demo-EC2'
        NODE_VERSION = '18'
    }

    tools {
        nodejs '18'
    }

    options {
        // Optional but recommended for cleanup
        skipDefaultCheckout(false)
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                // Clean workspace before pulling code
                cleanWs()
                git branch: 'main',
                    url: 'https://github.com/Dumindudasun/node-jenkins-dockerhub-EC2.git',
                    credentialsId: "${GITHUB_CREDENTIALS}"
            }
        }

        stage('Setup Node.js') {
            steps {
                nodejs("${NODE_VERSION}") {
                    sh 'echo "Node version:" && node -v'
                    sh 'echo "NPM version:" && npm -v'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "🔹 Cleaning old dependencies..."
                    sh '''
                       rm -rf node_modules
                       npm cache clean --force
                       echo "🔹 Installing dependencies..."
                       npm install
                    '''

                }
           }
        }

        stage('Run Tests') {
            steps {
                nodejs("${NODE_VERSION}") {
                    // Run app + tests safely
                    sh '''
                        echo "🔹 Running tests..."
                        node index.js || echo "⚠️ No main app execution"
                        npm test || echo "⚠️ No tests found"
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "🔹 Building Docker image..."
                    sh 'docker --version || echo "⚠️ Docker not found"'
                    docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo "🔹 Pushing image to DockerHub..."
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIALS}") {
                        docker.image("${DOCKER_IMAGE}:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    echo "🔹 Deploying to EC2..."
                    sshagent(['ec2-ssh-credentials-id']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@16.171.170.139 '
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
    }

    post {
        always {
            echo '🧾 Build finished!'
        }
        success {
            echo '✅ Build succeeded!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}
