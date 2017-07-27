{% if theme.changyan.enable and theme.changyan.appid and theme.changyan.appkey %}
  {% if is_home() %}
    <script id="cy_cmt_num" src="https://changyan.sohu.com/upload/plugins/plugins.list.count.js?clientId={{theme.changyan.appid}}"></script>
  {% else %}
    <script type="text/javascript">
    (function(){
        window.changyan.api.config({
            appid: 'cyt8lab7G',
            conf: 'prod_12cacb35dc399e15a09e870fdfced8da'
        });
    })();
    </script>
    <script type="text/javascript" src="https://assets.changyan.sohu.com/upload/plugins/plugins.count.js"></script>
  {% endif %}
{% endif %}
