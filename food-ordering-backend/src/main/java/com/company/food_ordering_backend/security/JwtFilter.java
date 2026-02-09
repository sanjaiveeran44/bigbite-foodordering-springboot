package com.company.food_ordering_backend.security;

import org.springframework.stereotype.Component;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import io.jsonwebtoken.Claims;

@Component
public class JwtFilter implements Filter {

    @Override
    public void doFilter(
            ServletRequest req,
            ServletResponse res,
            FilterChain chain
    ) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            Claims claims = JwtUtil.validateToken(token);

            request.setAttribute("userId",
                    Long.parseLong(claims.getSubject()));
            request.setAttribute("role",
                    claims.get("role"));
        }

        chain.doFilter(req, res);
    }
}
