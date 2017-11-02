# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  config.vm.box = 'ubuntu/trusty64'

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Forward all ports in 'dev_ports' to the host machine
  # 'auto_correct' is used to resolve any possible conflicts.
  dev_ports = [ 3000 ]
  dev_ports.each do |port|
    config.vm.network 'forwarded_port', guest: port, host: port, auto_correct: true
  end

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  
  #config.vm.synced_folder (ENV['PROJECT_DIR'] || ENV['PROJECT_DIR'] = '../projects'), '/projects'

  # Removes "stdin: is not a tty" annoyance as per
  # https://github.com/SocialGeeks/vagrant-openstack/commit/d3ea0695e64ea2e905a67c1b7e12d794a1a29b97
  config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  config.vm.provider 'virtualbox' do |vb|
    # Customize the amount of memory on the VM:
    vb.memory = '1024'
    # Enable the creation of symlinks on the VirtualBox instance
    # see http://blog.liip.ch/archive/2012/07/25/vagrant-and-node-js-quick-tip.html
    #vb.customize ['setextradata', :id, 'VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant', '1']
  end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Define a Vagrant Push strategy for pushing to Atlas. Other push strategies
  # such as FTP and Heroku are also available. See the documentation at
  # https://docs.vagrantup.com/v2/push/atlas.html for more information.
  # config.push.define "atlas" do |push|
  #   push.app = "YOUR_ATLAS_USERNAME/YOUR_APPLICATION_NAME"
  # end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL
     echo 'Adding Env Variables'
     echo 'export PORT=3000' >> ~/.bashrc
     echo 'export API_VERSION=1.0.0' >> ~/.bashrc
     echo 'export API_AUTHOR=Taller2 Team APGB' >> ~/.bashrc
     echo 'export API_RELEASE_DATE=November 2017' >> ~/.bashrc
     echo 'export TOKENS_SECRET=EF3foe408HH4ul94cHMLnWwu6SObwqT5UIjyWqZYnzoIjRxb7BDa7XYbHw' >> ~/.bashrc
     echo 'export API_RELEASE_DATE=November 2017' >> ~/.bashrc
     echo 'export POSTGRES_PASSWORD=3x4mpl3' >> ~/.bashrc
     echo 'export DATABASE_URL=postgres://postgres:3x4mpl3@localhost:5432/postgres' >> ~/.bashrc
     
     echo 'Adding repos'
     sudo add-apt-repository "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main"
     wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
     sudo apt-get update
     
     echo 'Installing build-essential'
     sudo apt-get install -y build-essential

     echo 'Installing PostgreSQL 9.6'
     sudo apt-get install -y postgresql-9.6

     echo 'Installing Node 6.x'
     curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
     sudo apt-get install -y nodejs

     echo 'Installing node global packages'
     npm install -g nodemon@1.12.1
     npm install -g @angular/cli@1.3.1
  SHELL
  #config.vm.provision :shell, path: 'scripts/bootstrap.sh'
end
