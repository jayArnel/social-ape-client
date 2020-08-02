pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        nodejs('node14') {
          sh 'npm install'
        }

      }
    }

    stage('Test') {
      steps {
        nodejs('node14') {
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
            publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: false, reportDir: 'reports/coverage', reportFiles: 'index.html', reportName: 'Test Coverage Report', reportTitles: 'Test Coverage Report'])
          }
        }

      }
    }

  }
  environment {
    CI = 'true'
    JEST_JUNIT_OUTPUT_DIR = 'reports'
    JEST_JUNIT_OUTPUT_NAME = 'test_results.xml'
    JEST_JUNIT_INCLUDE_SHORT_CONSOLE_OUTPUT = 'true'
  }
}