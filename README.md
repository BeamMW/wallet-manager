# Beam Wallet manager 

Requirements:

1. Beam wallet api
2. Redis
3. Python Django 2 (backend)
5. Angular 7 with Angular Material (frontend)

# Running Beam Wallet manager on local machine (Windows)

## Backend:
- Install [Python 3.6 version](https://www.python.org/downloads/release/python-360/). Make sure that C:\Program Files (x86)\Python36-32; and C:\Program Files (x86)\Python36-32\Scripts; is part of your PATH.

- Install Redis

- Install vitrualenv to create individual environment


    pip install virtualenv
- Create enviroment:


    mkdir C:\virtualenv

    cd C:\virtualenv

    virtualenv wallet-manager

- Activate enviroment


    C:\virtualenv\wallet-manager\Scripts\activate

- Clone repository


    cd C:\

    git clone https://github.com/BeamMW/wallet-manager.git

- Install requirements


    cd wallet-manager

    pip install -r requirements.txt
    
    python manage.py makemigrations

    python manage.py migrate

- Run server


    python manage.py runserver
    
## Frontend:

    cd C:/wallet-manager/frontend
    
    npm install
    
    ng serve
    
## Wallet api

- Download wallet api

- Extract api to wallet folder

- Run api

   
    cd path to wallet
    
    wallet-api --node_addr=eu-nodes.testnet.beam.mw:8100 --pass=123 --use_http=1  --port=10000


### Wallet can be added to the manager using the port of the running wallet API
