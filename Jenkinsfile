pipeline {
    agent any

    stages {

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonarscanner'

                    withSonarQubeEnv('sonarqube') {
                        bat """
                        "${scannerHome}\\bin\\sonar-scanner.bat" ^
                        -Dsonar.projectKey=scanshield ^
                        -Dsonar.projectName=ScanShield ^
                        -Dsonar.projectVersion=1.0 ^
                        -Dsonar.sources=.
                        """
                    }
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

    post {
        always {
            echo 'Pipeline completed.'
        }

        success {
            echo 'Build Successful!'
        }

        failure {
            echo 'Build Failed!'
        }
    }
}