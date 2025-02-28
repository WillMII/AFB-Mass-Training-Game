using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;



public class CountingTypes : MonoBehaviour
{
    public CluePart TO;
    public CluePart PO;
    public CluePart ED;
    public CluePart SW;
    public CluePart TD;
    public CluePart TDIP;
    public CluePart Brief;

    private bool[] found = new bool[7];
    public TMP_Text text;
    private int numFound;
    private int i;

    // Start is called before the first frame update
    void Start()
    {
        found[0] = TO.getAlrClk();
        found[1] = PO.getAlrClk();
        found[2] = ED.getAlrClk();
        found[3] = SW.getAlrClk();
        found[4] = TD.getAlrClk();
        found[5] = TDIP.getAlrClk();
        found[6] = Brief.getAlrClk();

        //text = this.gameObject.GetComponent<TMP_Text>();
        numFound = 0;
    }

    // Update is called once per frame
    void Update()
    {
        numFound = 0;
        i = 0;
        while (i < 7)
        {
            if (found[i])
            {
                numFound += 1;
            }
            i++;
        }
        
        text.text = "STINFO Types Found: " + numFound +"/7";
    }
}
