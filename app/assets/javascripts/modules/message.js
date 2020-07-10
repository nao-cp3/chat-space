$(function(){
  function buildHTML(message){
    if (message.image) {
      let html =
        `<div class="messages" data-message-id=${message.id}>
            <div class="messages__user">
              ${message.user_name}
            </div>
            <div class="messages__data">
              ${message.created_at}
            </div>
          </div>
        <div class="content">
            <p class="content__message">
              ${message.content}
            </p>
            <img src="${message.image}", class="Message__image">
        </div>`
      return html;
    } else {
      let html =
      `<div class="messages" data-message-id=${message.id}>
          <div class="messages__user">
            ${message.user_name}
          </div>
          <div class="messages__data">
            ${message.created_at}
          </div>
        </div>
      <div class="content">
          <p class="content__message">
            ${message.content}
          </p>
      </div>`
      return html;
    };
  }

  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.form__send').prop('disabled', false)
      $('form')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.form__send').prop('disabled', false)
    });
  });
});