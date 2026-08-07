pipeline {
    agent any

    tools {
        sonarQube 'sonarscanner'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    bat """
                    sonar-scanner ^
                    -Dsonar.projectKey=scanshield ^
                    -Dsonar.projectName=ScanShield ^
                    -Dsonar.sources=. ^
                    -Dsonar.host.url=http://localhost:9000
                    """
                }
            }
        }

        stage('Verify Docker') {
            steps {
                bat 'docker --version'
                bat 'docker compose version'
            }
        }

        stage('Build Backend') {
            steps {
                bat 'docker build -t scanshield-backend .'
            }
        }

        stage('Build Frontend') {
            steps {
                bat 'docker build -t scanshield-frontend ./frontend'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker compose up -d --build'
            }
        }

        stage('Verify Containers') {
            steps {
                bat 'docker compose ps'
            }
        }
    }
}