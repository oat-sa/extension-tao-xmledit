<div class="feedback-warning item-instruction">
    <p><span class="icon-info icon"></span><span class="instruction-message">{{__ "Invalid Response Processing"}}</span></p>
    <ul>
        {{#each messages}}
        <li>{{.}}</li>
        {{/each}}
    </ul>
</div>