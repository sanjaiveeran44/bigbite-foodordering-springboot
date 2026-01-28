package com.company.foodorder.dao;

import com.company.foodorder.model.MenuItem;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MenuItemDAO {

    private final JdbcTemplate jdbcTemplate;

    public MenuItemDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private final RowMapper<MenuItem> menuItemRowMapper = new RowMapper<>() {
    @Override
        public MenuItem mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new MenuItem(
                    rs.getLong("id"),
                    rs.getString("name"),
                    rs.getDouble("price"),
                    rs.getBoolean("is_active")
            );
        }
    };

    public List<MenuItem> findActiveMenuItems() {
        String sql = """
                SELECT id, name, price, is_active
                FROM menu_items
                WHERE is_active = true
                """;
        return jdbcTemplate.query(sql, menuItemRowMapper);
    }

    public Long createMenuItem(String name, double price) {
        String sql = """
                INSERT INTO menu_items (name, price, is_active)
                VALUES (?, ?, true)
                """;
        jdbcTemplate.update(sql, name, price);

        return jdbcTemplate.queryForObject(
                "SELECT LAST_INSERT_ID()",
                Long.class
        );
    }
}









/* new RowMapper<MenuItem>() {
    @Override
    public MenuItem mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new MenuItem(
                rs.getLong("id"),
                rs.getString("name"),
                rs.getDouble("price"),
                rs.getBoolean("is_active")
        );
    }
};
*/