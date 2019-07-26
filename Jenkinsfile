pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'cnpm install'
        sh 'npm run build'
      }
    }
    stage('test') {
      steps {
        sh 'systemctl stop nginx.service'
        sh 'rm  -rf /usr/share/nginx/html/*'
        sh 'mv -f ./dist/* /usr/share/nginx/html/'
        sh 'systemctl start nginx.service'
      }
    }
  }
}