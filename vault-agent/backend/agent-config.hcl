vault {
  address = "http://127.0.0.1:8200"
}

auto_auth {
  method {
    type = "approle"

    config = {
      role_id_file_path = "role_id.txt"
      secret_id_file_path = "secret_id.txt"
      remove_secret_id_file_after_reading = false
    }
  
  }

  sink {
    type = "file"
    config = {
      path = "appToken"
    }
  }
}