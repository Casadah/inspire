{/* Newsletter */}
<div className="reveal-item bg-white/5 rounded-3xl p-8">
  <h4
    className="text-white font-bold text-xl mb-3"
    style={{ fontFamily: 'Sora, sans-serif' }}
  >
    Subscribe to Our Newsletter
  </h4>

  <p className="text-white/60 text-sm mb-6">
    Stay updated with our latest programs, success stories, and opportunities to get involved.
  </p>

  {/* Mailchimp Embedded Form */}
  <div id="mc_embed_signup">
    <form
      action="https://YOUR-ACCOUNT.usX.list-manage.com/subscribe/post?u=XXXXXXX&id=XXXXXXX"
      method="post"
      target="_blank"
      className="flex gap-3"
    >
      <input
        type="email"
        name="EMAIL"
        required
        placeholder="Enter your email"
        className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-full px-5 py-3 outline-none"
      />

      <button
        type="submit"
        className="bg-[#F2B33D] hover:bg-[#e0a336] text-[#0B0D10] rounded-full px-6 font-semibold flex items-center gap-2"
      >
        Subscribe
      </button>

      {/* bot protection */}
      <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
        <input type="text" name="b_xxxxx_xxxxx" tabIndex={-1} defaultValue="" />
      </div>
    </form>
  </div>
</div>
