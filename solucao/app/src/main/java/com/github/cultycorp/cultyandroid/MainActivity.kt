package com.github.cultycorp.cultyandroid

import android.os.Bundle
import android.support.design.widget.NavigationView
import android.support.v4.widget.DrawerLayout
import android.support.v7.app.ActionBarDrawerToggle
import android.support.v7.app.AppCompatActivity
import android.view.Gravity
import android.view.Menu
import android.view.MenuItem
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {

    private lateinit var drawer : DrawerLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(findViewById(R.id.toolbar))

        drawer = findViewById(R.id.drawer_layout)

        var navigationView: NavigationView = findViewById(R.id.nav_view)
        navigationView.setNavigationItemSelectedListener(this)
        hideDrawerItems(navigationView)

        var toggle = ActionBarDrawerToggle(this, drawer, toolbar, R.string.abrirOpcoes, R.string.fecharOpcoes)
        drawer.addDrawerListener(toggle)
        toggle.syncState()
/*        fab.setOnClickListener { view ->
            Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                .setAction("Action", null).show()
        }*/
    }

    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        var id = item.itemId
        when (id) {
            R.id.nav_explore -> Toast.makeText(this, "Explorar tudo aqui!", Toast.LENGTH_SHORT).show()
            R.id.nav_following -> Toast.makeText(this, "Vamos seguir todo mundo!", Toast.LENGTH_SHORT).show()
            R.id.nav_artists -> Toast.makeText(this, "Artistas de araque!", Toast.LENGTH_SHORT).show()
            R.id.login -> Toast.makeText(this, "Vamos entrando!", Toast.LENGTH_SHORT).show()
            R.id.login -> Toast.makeText(this, "Vamos entrando!", Toast.LENGTH_SHORT).show()
            R.id.upload -> Toast.makeText(this, "Vamos mandar trem!", Toast.LENGTH_SHORT).show()
            R.id.profile -> Toast.makeText(this, "Olha seu perfil!", Toast.LENGTH_SHORT).show()
            R.id.logout -> Toast.makeText(this, "Vai embora, ingrato!", Toast.LENGTH_SHORT).show()
        }
        drawer.closeDrawer(Gravity.START)
        return true
    }

    override fun onBackPressed() {
        if(drawer.isDrawerOpen(Gravity.START)) drawer.closeDrawer(Gravity.START) else super.onBackPressed()
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.menu_main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        return when (item.itemId) {
            R.id.action_settings -> true
            else -> super.onOptionsItemSelected(item)
        }
    }

    private fun hideDrawerItems(nav : NavigationView) {
        //Se usuario estiver logado
        if (true) {
            nav.menu.findItem(R.id.login).isVisible = false

            nav.menu.findItem(R.id.logout).isVisible = true
            nav.menu.findItem(R.id.profile).isVisible = true
            nav.menu.findItem(R.id.upload).isVisible = true
        }
        else {
            nav.menu.findItem(R.id.login).isVisible = true

            nav.menu.findItem(R.id.logout).isVisible = false
            nav.menu.findItem(R.id.profile).isVisible = false
            nav.menu.findItem(R.id.upload).isVisible = false
        }
    }
}
