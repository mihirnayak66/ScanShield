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

        stage('Bandit Security Scan') {
            steps {
                bat '''
                python -m bandit -r . -f html -o bandit-report.html || exit /b 0
                '''
            }
            post {
                always {
                    archiveArtifacts artifacts: 'bandit-report.html', fingerprint: true
                }
            }
        }

        stage('Generate SBOM') {
            steps {
                bat 'syft . -o cyclonedx-json=sbom.json'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'sbom.json', fingerprint: true
                }
            }
        }
        stage('Gitleaks Secret Scan') {
            
    steps {
        bat '''
        gitleaks detect --source . --report-format json --report-path gitleaks-report.json --exit-code 0
        '''
    }
    post {
        always {
            archiveArtifacts artifacts: 'gitleaks-report.json', fingerprint: true
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