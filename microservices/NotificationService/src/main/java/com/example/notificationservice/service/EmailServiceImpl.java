package com.example.notificationservice.service;

import com.example.notificationservice.model.EmailRequest;
import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@AllArgsConstructor
public class EmailServiceImpl implements MailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Override
    public void sendEmail(EmailRequest email) throws Exception {
        // Prepare the email context
        Context context = new Context();
        context.setVariable("receiver_name", email.getReceiverName());
        context.setVariable("company", email.getParams().getCompany());
        context.setVariable("color", email.getParams().getColorCode());
        context.setVariable("token_expiration", email.getParams().getTokenExpiration());
        context.setVariable("confirmation_link", email.getParams().getConfirmationLink());

        // Render the Thymeleaf template
        String htmlContent = templateEngine.process("validation-email", context);

        // Send the email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        // This is a fake "from" address just to give the sender a name.
        InternetAddress from = new InternetAddress("abc@example.com", email.getSenderName());
        InternetAddress to = new InternetAddress(email.getReceiverEmail());
        mimeMessage.setFrom(from);
        mimeMessage.addRecipient(Message.RecipientType.CC, to);
        mimeMessageHelper.setSubject(email.getSubject());
        mimeMessageHelper.setText(htmlContent, true);
        mailSender.send(mimeMessage);
    }
}
