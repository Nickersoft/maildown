# 💌 MailDown

MailDown is (very much an alpha) CLI tool for writing transactional and marketing emails using [markdown](https://daringfireball.net/projects/markdown/).

MM comes with a slew of impressive features, such as:

📱 **Responsiveness by default**: MailDown uses [MJML](https://mjml.io) under-the-hood for its styling, layout engine and transpiler, so you can be assured that your emails will look beautiful on every device.

🔁 **Variable interpolation**: Using the incredibly-fast [ETA](https://eta.js.org/) templating language, MailDown allows you to inject variables into your email templates at runtime.

🙏🏻 **No runtime overhead**: MailDown compiles your email templates to regular JavaScript functions, so there's no need to read HTML files from the filesystem or use MJML at runtime.

---

**MailDown is still an unpublished project and in active development. Expect bugs.**

## How to use

Using MailDown is dead-simple. Once the CLI is installed (after we publish it lol), you can set up a project similar to the following:

```
emails/
  en/
    hello-world.email.md
```

Where `hello-world.email.md` might look something like:

```markdown
# Hello world!

Hey {{ name }},

This is a test email!
```

Then, in your root directory, run:

```
$ maildown generate
```

which will produce an `index.js` file inside the `emails` directory.

You can then use your email templates as follows:

```js
import { helloWorld } from './emails';

console.log(helloWorld.en.html({ name: 'John Doe' }));
```

You can check out the [example](./example) folder for a fuller example!

## Why would I need this?

With the plethora of high-end email suites like [SendGrid](https://sendgrid.com) and [MailChimp](https://mailchimp.com), it might be inconceivable why you want (or need) a library like this. There are a few reasons we decided to build this library, so let's look at them:

- **Money:** As your company grows, tools like SendGrid and MailChimp only become more and more expensive. Cheaper alternatives, such as [AWS SES](https://aws.amazon.com/ses/) don't feature snazzy template builders and expect you to bring your own HTML. That's where MailDown comes in.
- **Control:** Keeping all your email templates inside a SaaS product limits the portability of those templates if you decide to move to a different provider in the future. MailDown allows you to keep your email templates checked-in to version control, so you can send them using any provider.
- **Customization:** By giving developers full control over their email's styling, HTML, and content, they have the ability to bypass any restrictions imposed by a SaaS product.

## A word to the wise

Considering MailDown allows you to bypass needing to rely on a SaaS product for your emails, **it will be your responsibility to implement contact management and unsubscribe links.** This is crucial, as not providing a way for users to unsubscribe from emails may break anti-spam laws.
