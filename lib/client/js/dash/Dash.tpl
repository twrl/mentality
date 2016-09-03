
        <div class="section">
            <h6>Self-management</h6>
            <div class="row">
                <div rv-each-item="selfmanage" class="col s6 m4 l2">
                    <div rv-data-target="item.location" class="card red darken-3">
                        <div class="card-content white-text">
                            { item.title }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="section">
            <h6>Clinical</h6>
            <div class="row">
                <div rv-each-item="clinical" class="col s6 m4 l2">
                    <div rv-data-target="item.location" class="card red darken-3">
                        <div class="card-content white-text">
                            { item.title }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="section">
            <h6>Self-help</h6>
            <div class="row">
                <div rv-each-item="selfhelp" class="col s6 m4 l2">
                    <div rv-data-target="item.location" class="card red darken-3">
                        <div class="card-content white-text">
                            { item.title }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="section">
            <h6>Crisis</h6>
            <div class="row">
                <div rv-each-item="crisis" class="col s6 m4 l2">
                    <div rv-data-target="item.location" class="card red darken-3">
                        <div class="card-content white-text">
                            { item.title }
                        </div>
                    </div>
                </div>
            </div>
        </div>
