import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class TestBCrypt {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println(encoder.matches("admin", "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBpsl7iKt.v3aq"));
        System.out.println(encoder.matches("123", "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBpsl7iKt.v3aq"));
        System.out.println(encoder.matches("12345", "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBpsl7iKt.v3aq"));
        System.out.println(encoder.matches("password", "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBpsl7iKt.v3aq"));
        System.out.println("admin hash: " + encoder.encode("admin"));
    }
}
