using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;



public class CountingTypes : MonoBehaviour
{
    public CluePart script1;
    private bool found1;
    public TMP_Text text;
    private int numFound;

    // Start is called before the first frame update
    void Start()
    {
        found1 = script1.getAlrClk();
        //text = this.gameObject.GetComponent<TMP_Text>();
        numFound = 0;
    }

    // Update is called once per frame
    void Update()
    {
        found1 = script1.getAlrClk();
        if (found1 == true)
        {
            numFound = 1;
        }
        text.text = "STINFO Types Found: " + numFound +"/7";
    }
}
