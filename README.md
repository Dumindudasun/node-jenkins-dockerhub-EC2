# 🚀 Node.js CI/CD Pipeline with Jenkins, Docker & AWS EC2

This project demonstrates a complete **CI/CD pipeline** using:
- **Node.js** for the web application  
- **Jenkins** for continuous integration and delivery  
- **Docker Hub** for container image storage  
- **AWS EC2** instance for deployment  

---

## 🧰 Tech Stack

| Tool | Purpose |
|------|----------|
| **Node.js** | Application runtime |
| **Jenkins** | CI/CD automation |
| **Docker** | Containerization |
| **Docker Hub** | Image repository |
| **AWS EC2** | Application hosting environment |

---

## 📦 Project Overview

The pipeline automatically:
1. Clones this GitHub repository into Jenkins.
2. Installs Node.js dependencies.
3. Builds and tests the Node.js application.
4. Builds a Docker image and pushes it to Docker Hub.
5. Connects to an **AWS EC2 instance** via SSH.
6. Pulls the latest Docker image and restarts the container automatically.

---

## 🧑‍💻 Prerequisites

Before running the pipeline, make sure you have:

- A **GitHub repository** containing this project.
- A **Docker Hub** account.
- An **AWS EC2 instance** (Ubuntu preferred).
- **Jenkins** installed on the EC2 instance with:
  - Docker installed and running.
  - Jenkins plugins:
    - *Git Plugin*
    - *NodeJS Plugin*
    - *Docker Pipeline Plugin*
    - *Pipeline: Stage View Plugin*
    - *SSH Agent Plugin*

---

## ⚙️ Jenkins Configuration

### 1. **Global Tool Configuration**

- **NodeJS** → Name: `node18`  
- **Git** → Path: `/usr/bin/git`
- **Docker** → Installed on EC2 and accessible to Jenkins (`sudo usermod -aG docker jenkins`)

### 2. **Credentials Setup**

Add the following credentials in Jenkins:
| ID | Type | Description |
|----|------|--------------|
| `github-creds` | Username & Password / Token | For accessing private GitHub repos |
| `dockerhub-creds` | Username & Password | For pushing images to Docker Hub |
| `ec2-ssh-credentials-id` | SSH Key | For connecting to EC2 instance |

---

## 🧩 Jenkinsfile Overview

Your pipeline (`Jenkinsfile`) includes the following stages:

```groovy
stages {
    stage('Checkout')       // Clones GitHub repo
    stage('Install Dependencies')  // Installs npm packages
    stage('Run Tests')      // Executes tests (optional)
    stage('Build Docker Image')    // Builds app image
    stage('Push Docker Image')     // Pushes image to Docker Hub
    stage('Deploy to EC2')         // Pulls and runs latest image on EC2
}




---

## 🧠 Tech Stack

- **Node.js** (Application)
- **Express.js** (Web Framework)
- **Jenkins** (Automation Server)
- **Docker** (Containerization)
- **GitHub Webhooks** (Trigger Jenkins build)
- **Docker Hub** (Image Registry)

---

## 📁 Project Structure

node-jenkins-demo/
│
├── Dockerfile
├── Jenkinsfile
├── package.json
├── index.js
└── README.md


## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Dumindudasun/node-jenkins-dockerhub.git
cd node-jenkins-demo

2️⃣ Install Dependencies
npm install

3️⃣ Run Locally
node index.js


Then visit:
👉 http://localhost:3000

4️⃣ Create a Docker Image
docker build -t <your-dockerhub-username>/node-jenkins-demo:latest .

5️⃣ Run the Container
docker run -p 3000:3000 <your-dockerhub-username>/node-jenkins-demo:latest

Jenkins CI/CD Pipeline Setup
Step 1: Configure GitHub Webhook
Go to your GitHub repository → Settings → Webhooks
Add a webhook:
Payload URL: http://<your-public-jenkins-url>/github-webhook/
Content type: application/json
Event: “Just the push event”

Step 2: Create Jenkins Job
Go to Jenkins Dashboard → New Item
Choose Pipeline
In Pipeline script from SCM:
SCM: Git
Repository URL: Step 2: Create Jenkins Job

Go to Jenkins Dashboard → New Item
Choose Pipeline
In Pipeline script from SCM:
SCM: Git
Repository URL: https://github.com/Dumindudasun/node-jenkins-dockerhub.git
Save and Build.

Step 3: Add Docker Hub Credentials
Go to Manage Jenkins → Credentials → Global
Add a new credential:
Kind: Username with password
ID: dockerhub-credentials
Username: your Docker Hub username
Password: Docker Hub Access Token

🧪 Testing the Pipeline
Commit and push a change to your GitHub repository
GitHub Webhook triggers Jenkins
Jenkins:
Pulls code
Builds the image
Pushes it to Docker Hub automatically 🎉

💡 Future Improvements
Deploy automatically to Kubernetes or AWS EC2
Add test coverage reports
Add email/slack notifications for build status

👨‍💻 Author
Dumindu Dasun
🎓 DevOps Enthusiast | Jenkins | Docker | CI/CD | Automation |

CV placement example:

Projects

Node.js CI/CD Pipeline with Jenkins, Docker & AWS EC2 — (Personal DevOps Project)
Implemented a full CI/CD workflow to automate building, testing, and deploying a Node.js app using Jenkins, Docker, and AWS EC2. Configured GitHub webhooks, Docker image publishing to Docker Hub, and EC2 deployment automation. Strengthened hands-on knowledge in cloud-based DevOps environments.

✅ LinkedIn description (shorter version):

Built and deployed a Node.js CI/CD pipeline using Jenkins, Docker, and AWS EC2. Automated code integration, Docker image creation, and EC2 deployment with Jenkins declarative pipelines. Enhanced skills in DevOps automation, cloud deployment, and CI/CD best practices.