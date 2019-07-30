pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('test') {
      steps {
        sh 'chmod -R 777 ./dist/'
      }
    }
    stage('deploy') {
      steps {
        sh 'scp -i /root/ooclserver_rsa -r ./dist/ root@39.98.52.38:/usr/local/bin/'
        sh 'ssh -i /root/ooclserver_rsa root@39.98.52.38 "cp -rf /usr/local/bin/dist/* /usr/share/nginx/html/"'
      }
    }
  }
}