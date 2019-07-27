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
        sh 'systemctl stop nginx.service'
        sh 'rm  -rf /usr/share/nginx/html/*'
        sh 'mv -f ./dist/* /usr/share/nginx/html/'
        sh 'systemctl start nginx.service'
      }
    }
	stage('deploy') {
	  steps {
		sh 'scp -i /root/ooclserver_rsa -r ./dist root@39.98.52.38:/opt/vue-web/'
		sh 'ssh -i /root/ooclserver_rsa root@39.98.52.38 "cp -rf /usr/share/nginx/html/* /opt/vue-web/dist/"'
	  }
	}
  }
}