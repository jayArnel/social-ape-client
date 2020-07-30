pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        echo '$USER'
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