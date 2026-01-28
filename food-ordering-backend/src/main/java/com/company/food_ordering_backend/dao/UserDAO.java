package com.company.food_ordering_backend.dao;

import com.company.food_ordering_backend.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Repository
public class UserDAO {

    private final JdbcTemplate jdbcTemplate;

    public UserDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<User> userRowMapper = new RowMapper<>() {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new User(
                    rs.getLong("id"),
                    rs.getString("username"),
                    rs.getString("password_hash"),
                    rs.getString("role")
            );
        }
    };

    public Optional<User> findByUsername(String username) {
        String sql = """
                SELECT id, username, password_hash, role
                FROM users
                WHERE username = ?
                """;

        return jdbcTemplate.query(sql, userRowMapper, username)
                .stream()
                .findFirst();
    }

    public Long createUser(String username, String passwordHash, String role) {
        String sql = """
                INSERT INTO users (username, password_hash, role)
                VALUES (?, ?, ?)
                """;

        jdbcTemplate.update(sql, username, passwordHash, role);

        return jdbcTemplate.queryForObject(
                "SELECT LAST_INSERT_ID()",
                Long.class
        );
    }

    public void deleteUser(){
        
    }
}
