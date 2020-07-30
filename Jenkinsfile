pipeline {
  agent {
    docker {
      image 'node:14'
      args '-p 3000:3000'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm cache clean --force '
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test -- --coverage=true --coverageDirectory=reports/coverage --reporters="default" --reporters="jest-junit"'
      }
    }

    stage('Publish') {
      parallel {
        stage('Test results') {
          steps {
            junit 'reports/test_results.xml'
          }
        }

        stage('Coverage') {
          steps {
            cobertura(coberturaReportFile: 'reports/coverage/cobertura-coverage.xml')
          }
        }

      }
    }

  }
  environment {
    CI = 'true'
    JEST_JUNIT_OUTPUT_DIR = 'reports'
    JEST_JUNIT_OUTPUT_NAME = 'test_results.xml'
  }
}