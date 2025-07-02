// import java.io.*;
// import javax.servlet.*;
// import javax.servlet.http.*;

// public class FormServlet extends HttpServlet {
//     protected void doPost(HttpServletRequest request, HttpServletResponse response)
//             throws ServletException, IOException {
//         BufferedReader reader = request.getReader();
//         StringBuilder sb = new StringBuilder();
//         String line;
//         while ((line = reader.readLine()) != null) {
//             sb.append(line);
//         }

//         String jsonData = sb.toString();

//         // Optionally parse JSON using a library like Gson
//         System.out.println("Received data: " + jsonData);

//         // Return a response
//         response.setContentType("application/json");
//         response.getWriter().write("{\"success\": true}");
//     }

// }

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class FormServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Get individual form fields
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String email = request.getParameter("email");
        String language = request.getParameter("language");
        String employment = request.getParameter("employment");
        String explain = request.getParameter("explain");
        String[] interests = request.getParameterValues("interests");

        // Prepare response to browser
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<html><body>");
        out.println("<h1>Form submitted successfully!</h1>");
        out.println("<p><strong>Username:</strong> " + username + "</p>");
        out.println("<p><strong>Password:</strong> " + password + "</p>");
        out.println("<p><strong>Email:</strong> " + email + "</p>");
        out.println("<p><strong>Language:</strong> " + language + "</p>");
        out.println("<p><strong>Employment:</strong> " + employment + "</p>");
        out.println("<p><strong>Explain:</strong> " + explain + "</p>");
        out.print("<p><strong>Interests:</strong> ");
        if (interests != null) {
            out.print(String.join(", ", interests));
        } else {
            out.print("None");
        }
        out.println("</p>");
        out.println("</body></html>");
    }
}
