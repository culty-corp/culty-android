package com.github.cultycorp.cultyandroid.data

import com.github.cultycorp.cultyandroid.data.model.LoggedInUser
import java.io.IOException

/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
class LoginDataSource {

    fun login(username: String, password: String): Result<LoggedInUser> {
        try {
            // TODO: handle loggedInUser authentication
            if(username == "admin" && password == "123456") {
                val fakeUser = LoggedInUser(java.util.UUID.randomUUID().toString(), "Administrador")
                return Result.Success(fakeUser)
            } else {
                val fakeUser = LoggedInUser(java.util.UUID.randomUUID().toString(), "Usuário e senha inválidos")
                return Result.Falha(fakeUser)
            }
            return Result.Error(IllegalArgumentException("Usuário e senha inválidos"))
        } catch (e: Throwable) {
            return Result.Error(IOException("Error logging in", e))
        }
    }

    fun logout() {
        // TODO: revoke authentication
    }
}

