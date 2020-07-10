$(function(){
  function buildHTML(message){
    if ( message.image ) {
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
            <img class="Message__image" src="${message.image}">
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

  let reloadMessages = function() {
    console.log("test");
    let last_message_id = $('.messages:last').data("message-id") ||0; 
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});