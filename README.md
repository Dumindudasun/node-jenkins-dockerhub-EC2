# 🚀 Node.js CI/CD Pipeline with Jenkins and Docker

This project demonstrates a **Complete CI/CD pipeline** for a simple Node.js application using **Jenkins**, **GitHub Webhooks**, and **Docker Hub**.

The goal is to automate the process of:
1. Pulling code from GitHub
2. Running unit tests
3. Building a Docker image
4. Pushing the image to Docker Hub
5. Deploying the container automatically

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