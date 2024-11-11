# Lab 3: Cross-platform Security
**Instructor**: Kokub Sultan (ITSC320)  
**Student**: Harsingh Sekhon (882987)

# Security Assessment

## 1. Introduction
The Totally Secure Math app is designed to help users take notes and store mathematical equations. Despite its functionality, the app must ensure that user data and the application itself remain secure. This report presents a comprehensive security assessment focusing on identifying and mitigating vulnerabilities related to insecure data storage, improper authentication, code injection, insufficient input validation, and insecure code practices.

## 2. Vulnerability Assessment

### 2.1 Insecure Data Storage
**Description**: The app stores user notes in plaintext, which can be easily accessed if the device is compromised.

**Impact**: Sensitive information, such as user credentials and personal notes, can be exposed, leading to data breaches and unauthorized access.

### 2.2 Improper Authentication
**Description**: The current implementation uses hardcoded credentials for login validation, which is insecure.

**Impact**: Unauthorized users could gain access to the app by exploiting weak authentication mechanisms, leading to potential data leaks.

### 2.3 Code Injection
**Description**: The app lacks proper input validation, making it susceptible to code injection attacks.

**Impact**: Malicious users can inject harmful code, which could be executed to manipulate or damage the application data and structure.

### 2.4 Insufficient Input Validation
**Description**: User inputs are not properly sanitized, leading to vulnerabilities like SQL injection and cross-site scripting (XSS).

**Impact**: Attackers can exploit these vulnerabilities to execute arbitrary code, steal sensitive information, or corrupt data.

### 2.5 Insecure Code Practices
**Description**: The app includes several insecure coding practices, such as using hardcoded credentials and improper error handling.

**Impact**: These practices can lead to unauthorized access, data leaks, and other security breaches.

## 3. Security Measure Implementation

### 3.1 Node JS Backend 
**Modification**: Created a new Express Backend system by which API request can be made for securely handling security procedures.

### 3.2 Secure Data Storage
**Modification**: Moved the Data Storage to the backend server so Client Side cannot directly access the users detail. Used bcrypt to store encrypted password.

### 3.3 Secure Authentication Practices
**Modification**: Implement secure authentication practices using bcrypt for password hashing.

### 3.4 Input Validation and Sanitization
**Modification**: Used middleware to ensure input validation and sanitization using express-validator.

### 3.5 Rectify Insecure Code Practices
**Modification**: Remove hardcoded credentials and improve error handling.

## 4. Importance of Security Measures
Implementing these security measures is crucial to protect sensitive user data and ensure the app's integrity. Encryption helps prevent data breaches by making data unreadable without the correct decryption key. Secure authentication practices, like hashing passwords with bcrypt, ensure that user credentials are not stored in plaintext, making it harder for attackers to gain unauthorized access. Proper input validation and sanitization prevent common vulnerabilities like code injection and SQL injection, safeguarding the app against malicious inputs. Rectifying insecure coding practices ensures that the application follows best practices, reducing the risk of security breaches due to human error or oversight.

## 5. Reflections and Lessons Learned
During the security assessment and implementation process, several key lessons were learned:
- **Encryption and Secure Storage**: Encrypting sensitive data before storing it is a fundamental practice to protect against data breaches.
- **Authentication Best Practices**: Using hashing algorithms like bcrypt ensures that passwords are stored securely, making it difficult for attackers to retrieve original passwords even if they gain access to the database.
- **Input Validation**: Properly validating and sanitizing inputs is essential to prevent various forms of code injection attacks, which can compromise application security.
- **Error Handling**: Implementing robust error handling mechanisms helps to mitigate the impact of unexpected errors and prevents leakage of sensitive information through error messages.

## 6. Best Practices Moving Forward
- Regularly update dependencies and libraries to patch known vulnerabilities.
- Conduct periodic security audits and code reviews to identify and address potential security issues.
- Implement a secure development lifecycle (SDL) to integrate security practices throughout the development process.
- Educate the development team on security best practices to foster a security-first mindset.

## References
- OWASP. (n.d.). OWASP Top Ten. Retrieved from [https://owasp.org/www-project-top-ten/](https://owasp.org/www-project-top-ten/)
- MDN Web Docs. (n.d.). Using the Web Crypto API. Retrieved from [https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- bcrypt. (n.d.). bcrypt documentation. Retrieved from [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt)
- Express Validator. (n.d.). express-validator documentation. Retrieved from [https://express-validator.github.io/docs/](https://express-validator.github.io/docs/)
- IEEE. (n.d.). IEEE Citation Guidelines. Retrieved from [https://ieeeauthorcenter.ieee.org/wp-content/uploads/IEEE-Reference-Guide.pdf](https://ieeeauthorcenter.ieee.org/wp-content/uploads/IEEE-Reference-Guide.pdf)
