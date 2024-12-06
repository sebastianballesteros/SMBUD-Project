# TODO: En el bash se debe cambiar el usuarname y password con el que se llama a la API Bulk
Scripts should be run in the following order:

1. To create an index run ./create_index.sh 
2. To ingest the data run ./ingest_data.sh

Note that both scripts need the endpoint and password of elastic search. The data that should be ingested should be in the input folder variable and it was preprocessed by our process_file.py
