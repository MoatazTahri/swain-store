package com.example.authenticationservice.service.user;

import lombok.Getter;
import com.example.authenticationservice.entity.UserCredential;
import com.example.authenticationservice.enumeration.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {

    private final String username;
    @Getter
    private final String email;
    private final String password;
    private final UserRole role;
    private final boolean enabled;
    private final boolean expired;
    private final boolean locked;

    public CustomUserDetails(UserCredential userCredential) {
        this.username = userCredential.getUsername();
        this.email = userCredential.getEmail();
        this.password = userCredential.getPassword();
        this.role = userCredential.getRole();
        this.enabled = userCredential.isEnabled();
        this.expired = userCredential.isExpired();
        this.locked = userCredential.isLocked();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        GrantedAuthority authority = new SimpleGrantedAuthority(role.name());
        return List.of(authority);
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !expired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
