pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        nodejs('NodeJS 14') {
          sh 'npm install'
        }

      }
    }

    stage('Test') {
      steps {
        nodejs('NodeJS 14') {
          sh 'npm test -- --coverage=true --coverageDirectory=reports/coverage --reporters="default" --reporters="jest-junit"'
        }

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
            cobertura(coberturaReportFile: 'reports/coverage/cobertura-coverage.xml', sourceEncoding: 'ASCII')
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